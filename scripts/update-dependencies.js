const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');  // To run npm commands

class DependencyUpdater {
    constructor(rootDir) {
        this.rootDir = rootDir || path.join(__dirname, '..');
    }

    // Get the latest version of a dependency from the npm registry (npmjs.com)
    getCurrentVersion(dependency) {
        try {
            const result = execSync(`npm view ${dependency} version`, { encoding: 'utf8' }).trim();
            return result;
        } catch (e) {
            console.error(`Error fetching version for ${dependency}: ${e.message}`);
            return null;
        }
    }

    // Recursively find all package.json files in the project, excluding node_modules
    findPackageJsonFiles(dir) {
        const result = [];
        const files = fs.readdirSync(dir);

        files.forEach((file) => {
            const filePath = path.join(dir, file);

            if (fs.statSync(filePath).isDirectory()) {
                // Ignore node_modules folder
                if (file !== 'node_modules') {
                    result.push(...this.findPackageJsonFiles(filePath)); // Recursively process directories
                }
            } else if (file === 'package.json') {
                result.push(filePath);
            }
        });

        return result;
    }

    // Update package.json to replace 'latest' or '*' with current versions from npm registry
    updatePackageJson(filePath) {
        const packageJson = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        let updated = false;

        // Function to update dependencies
        const updateDependencies = (dependencies) => {
            if (dependencies) {
                for (const [dep, version] of Object.entries(dependencies)) {
                    if (version === 'latest' || version === '*') {
                        const currentVersion = this.getCurrentVersion(dep);
                        if (currentVersion) {
                            updated = true;
                            dependencies[dep] = currentVersion; // Replace 'latest' or '*' with the current version from npm
                            console.log(`Updated ${dep} to version ${currentVersion}`);
                        }
                    }
                }
            }
        };

        // Update dependencies in the package.json
        updateDependencies(packageJson.dependencies);
        updateDependencies(packageJson.devDependencies);
        updateDependencies(packageJson.peerDependencies);

        // If updated, save the changes to the package.json file
        if (updated) {
            fs.writeFileSync(filePath, JSON.stringify(packageJson, null, 2));
            console.log(`Updated package.json: ${filePath}`);
        }
    }

    // Run the updater for all package.json files found
    updateAllPackageJsonFiles() {
        const packageJsonFiles = this.findPackageJsonFiles(this.rootDir);
        packageJsonFiles.forEach(this.updatePackageJson.bind(this));
    }
}

// Instantiate and run the updater
const updater = new DependencyUpdater();
updater.updateAllPackageJsonFiles();