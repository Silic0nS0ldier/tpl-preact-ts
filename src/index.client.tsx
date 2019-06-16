/**
 * Main entrypoint for client.
 */

import { h, render } from "preact";
import "preact/debug"; // This is automatically excluded in production builds
import App from './app';

render(<App />, document.body);
