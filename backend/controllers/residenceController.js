const db = require('../models');
const OpenAI = require('openai');

const { Residence, ResidenceImage } = db;

/**
 * @desc    Add a new residence listing
 * @route   POST /residence/add
 * @access  Protected (owner)
 */
const addResidence = async (req, res, next) => {
  try {
    const {
      title, description, housing_type, available_for, neighborhood,
      floor_num, address, rent_price, building_num,
      distance_from_university, capacity, rooms, bathrooms,
      wifi, parking, security,
    } = req.body;

    const residence = await Residence.create({
      title: title || null,
      description: description || null,
      housing_type: housing_type || null,
      available_for: available_for || null,
      neighborhood: neighborhood || null,
      is_available: true,
      floor_num: floor_num || null,
      address,
      rent_price,
      building_num: building_num || null,
      distance_from_university: distance_from_university || null,
      capacity: capacity || null,
      rooms: rooms || null,
      bathrooms: bathrooms || null,
      // req.body values arrive as strings from multipart/form-data, so we normalise
      wifi: wifi === true || wifi === 'true',
      parking: parking === true || parking === 'true',
      security: security === true || security === 'true',
      user_id: req.user.id,
    });

    if (req.files && req.files.length > 0) {
      const images = req.files.map((file) => ({
        image_url: `/uploads/residences/${file.filename}`,
        res_id: residence.res_id,
      }));
      await ResidenceImage.bulkCreate(images);
    }

    return res.status(201).json({
      success: true,
      message: 'Residence added successfully',
      residence,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all available residences
 * @route   GET /residence
 * @access  Public
 */
const getAllResidences = async (req, res, next) => {
  try {
    const residences = await Residence.findAll({
      include: [{ model: ResidenceImage }],
    });

    return res.status(200).json({ success: true, residences });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get a single residence by ID
 * @route   GET /residence/:id
 * @access  Public
 */
const getResidenceById = async (req, res, next) => {
  try {
    const residence = await Residence.findOne({
      where: { res_id: req.params.id },
      include: [{ model: ResidenceImage }],
    });

    if (!residence) {
      return res.status(404).json({
        success: false,
        message: 'Residence not found',
      });
    }

    return res.status(200).json({ success: true, residence });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update a residence (owner only, must own the listing)
 * @route   PUT /residence/:id
 * @access  Protected (owner)
 */
const updateResidence = async (req, res, next) => {
  try {
    const residence = await Residence.findByPk(req.params.id);

    if (!residence) {
      return res.status(404).json({
        success: false,
        message: 'Residence not found',
      });
    }

    // Prevent an owner from editing another owner's listing
    if (residence.user_id !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorised to edit this listing',
      });
    }

    await residence.update(req.body);

    return res.status(200).json({
      success: true,
      message: 'Residence updated successfully',
      residence,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a residence (owner only, must own the listing)
 * @route   DELETE /residence/:id
 * @access  Protected (owner)
 */
const deleteResidence = async (req, res, next) => {
  try {
    const residence = await Residence.findByPk(req.params.id);

    if (!residence) {
      return res.status(404).json({
        success: false,
        message: 'Residence not found',
      });
    }

    if (residence.user_id !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorised to delete this listing',
      });
    }

    await residence.destroy();

    return res.status(200).json({
      success: true,
      message: 'Residence deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    AI-powered property search (Groq — free tier, OpenAI-compatible API)
 * @route   POST /residence/ai-search
 * @access  Protected (any logged-in user)
 */
const aiSearch = async (req, res, next) => {
  try {
    const { query } = req.body;

    const residences = await Residence.findAll({
      where: { is_available: true },
      include: [{ model: ResidenceImage }],
    });

    if (residences.length === 0) {
      return res.status(200).json({ success: true, results: [] });
    }

    // Build a minimal summary of each property to send to the AI.
    // Keeping this small reduces token usage.
    const list = residences.map((r) => ({
      res_id: r.res_id,
      title: r.title,
      address: r.address,
      neighborhood: r.neighborhood,
      description: r.description,
      housing_type: r.housing_type,
      available_for: r.available_for,
      rent_price: r.rent_price,
      distance_from_university: r.distance_from_university,
      rooms: r.rooms,
      bathrooms: r.bathrooms,
      capacity: r.capacity,
      wifi: r.wifi,
      parking: r.parking,
      security: r.security,
    }));

    // Groq uses the same OpenAI SDK — only the baseURL and model differ.
    // Get a free API key at console.groq.com
    const client = new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: 'https://api.groq.com/openai/v1',
    });

    const prompt = `You are a student housing assistant. A student is looking for housing.

Student's request: "${query}"

Available properties (JSON):
${JSON.stringify(list, null, 2)}

Return ONLY a valid JSON array of the top 3 best-matching res_id values, ordered by best match.
Example: [4, 12, 7]
No explanation, no markdown — just the JSON array.`;

    const completion = await client.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2,
    });

    const content = completion.choices[0].message.content.trim();
    // Strip markdown code fences if the model wraps its answer
    const cleaned = content.replace(/```(?:json)?/gi, '').replace(/```/g, '').trim();
    const ids = JSON.parse(cleaned);

    // Map IDs back to the full residence objects (preserving AI ranking order)
    const results = ids
      .map((id) => residences.find((r) => r.res_id === id))
      .filter(Boolean);

    return res.status(200).json({ success: true, results });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addResidence,
  getAllResidences,
  getResidenceById,
  updateResidence,
  deleteResidence,
  aiSearch,
};
