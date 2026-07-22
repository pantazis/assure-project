# Local Editing and Build Instructions

1. **Clone the repository**  
   ```bash
   git clone <repository-URL>
   cd <repository-folder>
   ```

2. **Make your local edits**  
   Open the project in your editor, apply your changes, then stage and commit:  
   ```bash
   git add .
   git commit -m "Describe your changes"
   ```

3. **Build the production bundle**  
   ```bash
   ng build --configuration production --prerender
   ```

4. **Go to the build output**  
   ```bash
   cd dist/my-angular-app/browser
   ```

5. **Serve the static files for testing**  
   ```bash
   npx serve
   ```

6. **Verify your changes**  
   Open the URL shown (e.g. `http://localhost:3000`) in your browser to ensure everything works as expected.

7. **Push your commits**  
   ```bash
   cd ../../..        # back to the project root
   git push origin <branch-name>
   ```
