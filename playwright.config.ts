import { defineConfig } from '@playwright/test';
const basePath=process.env.PLAYWRIGHT_BASE_PATH || '/';
const port=Number(process.env.PLAYWRIGHT_PORT || 4173);
export default defineConfig({
  testDir:'./tests/e2e', fullyParallel:true,
  use:{baseURL:`http://127.0.0.1:${port}${basePath}`,headless:true,channel:process.env.CI?undefined:'msedge',trace:'retain-on-failure'},
  webServer:{command:`npm run preview -- --port ${port} --strictPort --base ${basePath}`,url:`http://127.0.0.1:${port}${basePath}`,reuseExistingServer:!process.env.CI},
  projects:[{name:'desktop',use:{viewport:{width:1440,height:900}}},{name:'tablet',use:{viewport:{width:768,height:1024}}},{name:'mobile',use:{viewport:{width:390,height:844}}}],
});
