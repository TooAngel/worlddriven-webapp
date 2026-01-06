import React from 'react'; // eslint-disable-line no-unused-vars
import { createRoot } from 'react-dom/client';

import { Dashboard } from './js/dashboard.jsx'; // eslint-disable-line no-unused-vars
import { TestDashboard } from './js/test/dashboard.js'; // eslint-disable-line no-unused-vars
import { PullRequest } from './js/pullrequest.jsx'; // eslint-disable-line no-unused-vars
import { TestPullRequest } from './js/test/pullrequest.js'; // eslint-disable-line no-unused-vars
import { Logs } from './js/logs.jsx'; // eslint-disable-line no-unused-vars

/**
 * main - The main method
 *
 * @return {void}
 **/
function main() {
  let tag = <PullRequest />;
  if (window.location.pathname === '/dashboard') {
    tag = <Dashboard />;
  }
  if (window.location.pathname === '/test/dashboard') {
    tag = <TestDashboard />;
  } else if (window.location.pathname.startsWith('/test/')) {
    tag = <TestPullRequest />;
  }
  if (window.location.pathname === '/admin') {
    tag = <Logs />;
  }

  const container = document.getElementById('app');
  const root = createRoot(container);
  root.render(tag);
}

main();
