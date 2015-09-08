# <%= capitalizedCamelCaseComponentName %>

<%= description %>

## Usage

1. Add dependency in `bower.json` of your app
    ```
    "<%= componentName %>": "<%= repoGitUrl %>"
    ```
    and install it with bower
    ```sh
    $> bower install
    ```

2. Include it in HTML.
    ```html
    <script src="path/to/<%= componentName %>/dist/umd/script.js"></script>
    ```
We provide three kind of module patterns:
    * [UMD](https://github.com/umdjs/umd/) - `dist/umd/script.js`
    * AMD - `dist/amd/script.js`
    * CommonJS - `dist/common/script.js`

3. Instantialize it and use it in JS:
    ```js
    var <%= camelCaseComponentName %> = new <%= capitalizedCamelCaseComponentName %>();
    ...
    ```

Please refer to `examples/` for more detail.

## Build

* Install dependencies
    ```sh
    $> npm install -g gulp bower babel # optional, if you'd like to have CLI tools in your env
    $> npm install
    $> bower install
    ```

* Clean build
    ```sh
    $> gulp
    ```

* (Non-clean) Build
    ```sh
    $> gulp build
    ```

## Run Tests
```sh
$> gulp test
```

## Development

* Develop with live reload in browser

    ```
    $> gulp serve
    ```

## To Submit Patch

1. Modify source file `src/script.js`

2. Make sure everthing works in browser
    ```sh
    $> gulp serve
    ```

3. Build
    ```sh
    $> gulp
    ```

4. Commit changes of these files if any:
    * `src/script.js`
    * `dist/*`
    * `examples/index.html`
    * `examples/manifest.webapp`
    * `bower.json`
    * `gulpfile.js`
    * `package.json`
    * `.bablerc`
    * `.eslintrc`
    * `README.md`
