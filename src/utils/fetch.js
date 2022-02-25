export async function post(url, data) {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: data
    })
    console.log('response', response);
    return response;
  } catch(err) {
    console.log('err', err);
  }
}