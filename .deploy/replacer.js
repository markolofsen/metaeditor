const replace = require("replace-in-file");
const glob = require("glob");

const Replacer = new class {

  async replace(filepath) {

    // const slashes = (filepath.match(/\//g) || []).length - 2;
    // const parent = '../'.repeat(slashes)

    const options = {
      files: filepath,
      from: [/src="\//g, /href="\//g],
      to: ['src="./', 'href="./'],
    };

    await new Promise(async (resolve, reject) => {
      try {
        const results = await replace(options);
        console.log("Replacement results:", results);
        resolve()
      } catch (error) {
        console.error("Error occurred:", error);
        reject()
      }
    })
  }

  async production() {

    await glob(`./build/` + '/**/*.html', async (err, res) => {
      if (err) {
        console.log('Error', err);
      } else {
        for (let filepath of res) {
          await this.replace(filepath)
        }
      }
    });

  }
}

process.argv.forEach((val, index, array) => {
  if (val === '-console') {
    Replacer.production()
  }
});

module.exports = Replacer
