// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs");

const args = process.argv.slice(2);
const name = args[0];

try {
  fs.mkdirSync(name);
  fs.writeFileSync(
    `${name}/index.ts`,
    `import ${name} from "./${name}";

export default ${name};
    `
  );
  fs.writeFileSync(
    `${name}/${name}.tsx`,
    `import "./${name}.styles.scss";

function ${name}() {
    return null;
}

export default ${name};`
  );
  fs.writeFileSync(
    `${name}/${name}.styles.scss`,
    `.${name} {
}`
  );
} catch (e) {
  // eslint-disable-next-line no-console
  console.error(e);
}
