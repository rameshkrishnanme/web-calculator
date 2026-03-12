# Calculator Manual Test Cases

You can run these tests manually, or use an automated testing tool like Puppeteer, Playwright, or Cypress to parse the `test_cases.json` file.

1. **Test addition**: Click the `1` button, then `+`, then `2`, then `=`. Verify the display shows `3`.
2. **Test subtraction**: Click `AC` (clear). Click `9`, `-`, `4`, `=`. Verify display shows `5`.
3. **Test multiplication**: Click `AC`. Click `6`, `×`, `7`, `=`. Verify display shows `42`.
4. **Test division**: Click `AC`. Click `8`, `÷`, `2`, `=`. Verify display shows `4`.
5. **Test decimals**: Click `AC`. Click `1`, `.`, `5`, `+`, `2`, `.`, `5`, `=`. Verify display shows `4`.
6. **Test deletion**: Click `AC`. Click `1`, `2`, `3`. Click `DEL`. Verify display shows `12`.
