/**
 * UniStay — one-time setup script
 * Run: node setup.js
 *
 * What it does:
 *   1. Asks for your Supabase connection URL
 *   2. Writes it to .env
 *   3. Runs all database migrations (creates every table)
 *   4. Creates the admin account
 */

const readline = require('readline');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ENV_PATH = path.join(__dirname, '.env');

// ─── Helpers ────────────────────────────────────────────────────────────────

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const ask = (question) =>
  new Promise((resolve) => rl.question(question, (answer) => resolve(answer.trim())));

const run = (cmd, label) => {
  process.stdout.write(`  → ${label}... `);
  try {
    execSync(cmd, { stdio: 'pipe', cwd: __dirname });
    console.log('✓');
  } catch (err) {
    console.log('✗');
    console.error('\n' + (err.stderr?.toString() || err.message));
    process.exit(1);
  }
};

// ─── Main ────────────────────────────────────────────────────────────────────

(async () => {
  console.log('\n╔═══════════════════════════════════════╗');
  console.log('║      UniStay — Project Setup          ║');
  console.log('╚═══════════════════════════════════════╝\n');

  // ── Step 1: Get Supabase URL ──────────────────────────────────────────────
  console.log('Step 1 of 3 — Supabase connection\n');
  console.log('  Where to find your URL:');
  console.log('  supabase.com → Your project → Connect → Session Pooler → URI\n');
  console.log('  It looks like:');
  console.log('  postgresql://postgres.YOURREF:PASSWORD@aws-1-REGION.pooler.supabase.com:5432/postgres\n');

  let dbUrl = '';

  // Check if already set in .env
  if (fs.existsSync(ENV_PATH)) {
    const existing = fs.readFileSync(ENV_PATH, 'utf8');
    const match = existing.match(/^DATABASE_URL=(.+)$/m);
    if (match && match[1] && !match[1].includes('xxxx')) {
      dbUrl = match[1];
      console.log(`  Found existing DATABASE_URL in .env`);
      const reuse = await ask('  Use it? (Y/n): ');
      if (reuse.toLowerCase() === 'n') dbUrl = '';
    }
  }

  if (!dbUrl) {
    dbUrl = await ask('  Paste your Supabase connection URI: ');
    if (!dbUrl.startsWith('postgresql://') && !dbUrl.startsWith('postgres://')) {
      console.error('\n  ✗ That does not look like a PostgreSQL URL. It should start with postgresql://');
      process.exit(1);
    }
  }

  // ── Step 2: Write .env ────────────────────────────────────────────────────
  console.log('\nStep 2 of 3 — Writing .env\n');

  let envContent = '';

  if (fs.existsSync(ENV_PATH)) {
    envContent = fs.readFileSync(ENV_PATH, 'utf8');
    // Replace or append DATABASE_URL
    if (/^DATABASE_URL=/m.test(envContent)) {
      envContent = envContent.replace(/^DATABASE_URL=.*/m, `DATABASE_URL=${dbUrl}`);
    } else {
      envContent += `\nDATABASE_URL=${dbUrl}\n`;
    }
  } else {
    envContent = [
      'PORT=3000',
      'JWT_SECRET=unistay_jwt_secret_change_in_production',
      'JWT_EXPIRES_IN=7d',
      'OPENAI_API_KEY=your_openai_api_key_here',
      `DATABASE_URL=${dbUrl}`,
      '',
    ].join('\n');
  }

  fs.writeFileSync(ENV_PATH, envContent, 'utf8');
  console.log('  ✓ .env updated');

  // ── Step 3: Migrate + Seed ────────────────────────────────────────────────
  console.log('\nStep 3 of 3 — Database setup\n');

  run('npx sequelize-cli db:migrate', 'Running migrations (creating all tables)');
  run('node db/seed-admin.js', 'Creating admin account');

  // ── Done ──────────────────────────────────────────────────────────────────
  console.log('\n╔═══════════════════════════════════════╗');
  console.log('║           Setup complete! ✓           ║');
  console.log('╚═══════════════════════════════════════╝\n');
  console.log('  Admin credentials:');
  console.log('    Email:    admin@unistay.com');
  console.log('    Password: Admin@1234\n');
  console.log('  Start the server:');
  console.log('    npm run dev\n');

  rl.close();
})();
