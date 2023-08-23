## BL Primo Customisation

A small project that allows you to run a local development environment for primo frontend customisation

`npm install`

`npm run start` - this is the development build, this will run browsersync and proxy the Primo instance for styling

`npm run build` - this is the production build, this will output the custom styling for Primo as a ZIP

# Build system Todos:
- Add html processing
- Zip in production
- Add img processing
- Add image optimisation
- Add proxy to primo NLE using browser-sync

- Minify in production - DONE
- Add JS processing - DONE
- Add local development server - DONE
- Add production/development environmental split - DONE
- Split watch requirements - DONE
- Add sourcemaps - DONE
- Add auto prefixing - DONE
- Add css concat - DONE
- Add error logging - DONE

# Primo customisation work
1. Rewrite provided css into sass
   - Ensure output pathing is the same
2. Ensure zip output matches requirements

# Futher todos
1. Add "release" concept from github to project
2. Add semantic versioning
3. Add changelog
4. Add issues format to github
5. Open source the project