const db = require("../models");
const OpenAI = require("openai");

const { Residence, ResidenceImage } = db;

/**
 * ==================================================
 * ADD RESIDENCE
 * ==================================================
 * Creates a new residence for the authenticated owner
 */

const addResidence = async (req, res) => {
  try {
    const {
      title, description, housing_type, available_for, neighborhood,
      floor_num, address, rent_price, building_num,
      distance_from_university, capacity, rooms, bathrooms,
      wifi, parking, security,
    } = req.body;

    /* ================= VALIDATION ================= */

    if (!address || !rent_price) {
      return res.status(400).json({
        success: false,
        message: "Address and rent price are required",
      });
    }

    if (Number(rent_price) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Rent price must be greater than zero",
      });
    }

    /* ================= CREATE RESIDENCE ================= */

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
      wifi: wifi === true || wifi === 'true',
      parking: parking === true || parking === 'true',
      security: security === true || security === 'true',
      owner_id: req.user.id,
    });

    /* ================= SAVE IMAGES ================= */

    if (req.files && req.files.length > 0) {
      const images = req.files.map((file) => ({
        image_url: `/uploads/residences/${file.filename}`,

        res_id: residence.res_id,
      }));

      await ResidenceImage.bulkCreate(images);
    }

    /* ================= RESPONSE ================= */

    return res.status(201).json({
      success: true,

      message: "Residence added successfully",

      residence,
    });
  } catch (error) {
    console.error("Add Residence Error:", error);

    return res.status(500).json({
      success: false,

      message: "Internal server error",
    });
  }
};

/**
 * ==================================================
 * GET ALL RESIDENCES
 * ==================================================
 * Returns all available residences
 */

const getAllResidences = async (req, res) => {
  try {
    const residences = await Residence.findAll(
      
      {
      include: [
        {
          model:ResidenceImage
          
        },
      ],
    }
  
  );

    return res.status(200).json({
      success: true,

      residences,
    });
  } catch (error) {
    console.error("Get Residences Error:", error);

    return res.status(500).json({
      success: false,

      message: "Internal server error",
    })
  }
};

/**
 * ==================================================
 * UPDATE RESIDENCE
 * ==================================================
 * Allows owner to update their residence
 */

const updateResidence = async (req, res) => {
  try {
    const { id } = req.params;

    const residence = await Residence.findByPk(id);

    /* ================= CHECK RESIDENCE ================= */

    if (!residence) {
      return res.status(404).json({
        success: false,

        message: "Residence not found",
      });
    }

    /* ================= OWNER CHECK ================= */

    if (residence.owner_id !== req.user.id) {
      return res.status(403).json({
        success: false,

        message: "Access denied",
      });
    }

    /* ================= UPDATE ================= */

    await residence.update(req.body);

    return res.status(200).json({
      success: true,

      message: "Residence updated successfully",

      residence,
    });
  } catch (error) {
    console.error("Update Residence Error:", error);

    return res.status(500).json({
      success: false,

      message: "Internal server error",
    });
  }
};

/**
 * ==================================================
 * DELETE RESIDENCE
 * ==================================================
 * Allows owner to delete their residence
 */

const deleteResidence = async (req, res) => {
  try {
    const { id } = req.params;

    const residence = await Residence.findByPk(id);

    /* ================= CHECK RESIDENCE ================= */

    if (!residence) {
      return res.status(404).json({
        success: false,

        message: "Residence not found",
      });
    }

    /* ================= OWNER CHECK ================= */

    if (residence.owner_id !== req.user.id) {
      return res.status(403).json({
        success: false,

        message: "Access denied",
      });
    }

    /* ================= DELETE ================= */

    await residence.destroy();

    return res.status(200).json({
      success: true,

      message: "Residence deleted successfully",
    });
  } catch (error) {
    console.error("Delete Residence Error:", error);

    return res.status(500).json({
      success: false,

      message: "Internal server error",
    });
  }
};

const getResidenceById = async (req, res) => {
  try {
    const { id } = req.params;

    const residence = await Residence.findOne({
      where: { res_id: id },
      include: [{ model: ResidenceImage }],
    });

    if (!residence) {
      return res.status(404).json({
        success: false,
        message: 'Residence not found',
      });
    }

    return res.status(200).json({
      success: true,
      residence,
    });
  } catch (error) {
    console.error('Get Residence By ID Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

const aiSearch = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query || !query.trim()) {
      return res.status(400).json({ success: false, message: "Query is required" });
    }

    const residences = await Residence.findAll({
      where: { is_available: true },
      include: [{ model: ResidenceImage }],
    });

    if (residences.length === 0) {
      return res.status(200).json({ success: true, results: [] });
    }

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

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const prompt = `You are a student housing assistant. A student is looking for housing.

Student's request: "${query}"

Available properties (JSON):
${JSON.stringify(list, null, 2)}

Return ONLY a valid JSON array of the top 3 best-matching res_id values, ordered by best match. Example: [4, 12, 7]. No explanation, no markdown, just the JSON array.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
    });

    const content = completion.choices[0].message.content.trim();
    const ids = JSON.parse(content);

    const results = ids
      .map((id) => residences.find((r) => r.res_id === id))
      .filter(Boolean);

    return res.status(200).json({ success: true, results });
  } catch (error) {
    console.error("AI Search Error:", error);
    return res.status(500).json({ success: false, message: "AI search failed" });
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
