export default function getInitialHtml(content, manifest, preloadedState) {
  let scriptTags = '';
  if (manifest['client.js'] && manifest['vendor.js']) {
    scriptTags = [
      manifest['vendor.js'],
      manifest['client.js'],
    ].map(file => `<script type="text/javascript" src="/${file}"></script>`).join('');
  }

  let cssTag = '';
  if (manifest['client.css']) {
    cssTag = `<link rel="stylesheet" href="/${manifest['client.css']}" />`;
  }

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1" />
        ${cssTag}
        <script>window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')};</script>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous" />
      </head>
      <body>
        <div id="root">${content}</div>
        ${scriptTags}
        <script src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js" crossorigin />
      </body>
    </html>
  `;
}
