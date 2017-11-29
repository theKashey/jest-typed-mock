import scan from 'scan-directory';


export default async function look(root) {
  const __mocks__ = await scan(root, (file) => file.match(/__mocks__/));
  return __mocks__.map(file => ({
    mock: file,
    file: file.replace('/__mocks__/', '/')
  }))
}