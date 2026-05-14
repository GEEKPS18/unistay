/**
 * Creates a single admin user in the database.
 * Run once: node db/seed-admin.js
 *
 * Change ADMIN_EMAIL / ADMIN_PASSWORD before running in production.
 */

require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const bcrypt = require('bcrypt');
const db = require('../models');

const ADMIN_EMAIL    = 'admin@unistay.com';
const ADMIN_PASSWORD = 'Admin@1234';

(async () => {
  try {
    await db.sequelize.authenticate();

    const existing = await db.User.findOne({ where: { email: ADMIN_EMAIL } });

    if (existing) {
      console.log(`Admin already exists (id=${existing.user_id}). Nothing to do.`);
      process.exit(0);
    }

    const hashed = await bcrypt.hash(ADMIN_PASSWORD, 10);

    const admin = await db.User.create({
      first_name: 'Admin',
      last_name:  'UniStay',
      email:      ADMIN_EMAIL,
      password:   hashed,
      role:       'admin',
    });

    await db.Admin.create({
      user_id:     admin.user_id,
      permissions: 'all',
    });

    console.log(`Admin created successfully!`);
    console.log(`  ID:       ${admin.user_id}`);
    console.log(`  Email:    ${ADMIN_EMAIL}`);
    console.log(`  Password: ${ADMIN_PASSWORD}`);
    console.log(`  Role:     admin`);

    process.exit(0);
  } catch (err) {
    console.error('Failed to create admin:', err.message);
    process.exit(1);
  }
})();
