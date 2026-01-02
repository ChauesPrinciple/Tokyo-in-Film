# How to Deploy "Tokyo in Film"

Your website is built with static HTML, CSS, and JavaScript. This makes it incredibly easy and free to host. Here are the two best options:

## Option 1: Netlify Drop (Easiest / Fastest)
*Best if you just want to get it online in 30 seconds.*

1.  Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2.  Locate your project folder: `tokyo-in-film`.
3.  **Drag and drop** the entire `tokyo-in-film` folder onto the Netlify page.
4.  Netlify will upload the files and instantly give you a live URL (e.g., `silly-name-1234.netlify.app`).
5.  (Optional) Sign up for a free Netlify account to change the site name to something like `tokyo-in-film.netlify.app`.

## Option 2: GitHub Pages (Best for Version Control)
*Best if you want to update the site over time and keep it open source.*

1.  Create a new public repository on [GitHub.com](https://github.com/) named `tokyo-in-film`.
2.  Initialize a git repository in your project folder (if you haven't already):
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    ```
3.  Push your code to GitHub:
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/tokyo-in-film.git
    git branch -M main
    git push -u origin main
    ```
4.  On GitHub, go to **Settings** > **Pages**.
5.  Under **Source**, select `main` branch and `/ (root)` folder.
6.  Click **Save**. Your site will be live at `https://YOUR_USERNAME.github.io/tokyo-in-film/`.

## Post-Deployment Checklist

1.  **Check Links**: Visit your new URL and click through the navigation to ensure all pages (Pre-Production, Glossary, etc.) load correctly.
2.  **Test Forms**: Submit a test entry on one of your Google Forms to ensure it works on the live site.
3.  **Share**: Send the link to your students!
