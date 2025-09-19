// This data will reset on Netlify function cold starts.
// For true persistence, an external database (e.g., FaunaDB, Supabase, a custom API) is required.
let posts = [];

exports.handler = async (event, context) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*', // Enable CORS for all origins
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS'
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers
    };
  }

  try {
    switch (event.httpMethod) {
      case 'POST':
        const body = JSON.parse(event.body);
        const newPost = {
          id: Date.now(),
          timestamp: new Date().toISOString(),
          ...body,
        };
        posts.push(newPost);
        console.log('Received new post:', newPost);
        return {
          statusCode: 201,
          headers,
          body: JSON.stringify(newPost),
        };

      case 'GET':
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(posts),
        };

      case 'DELETE':
        posts = []; // Clear all data
        console.log('All posts cleared.');
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ message: 'All posts cleared successfully.' }),
        };

      default:
        return {
          statusCode: 405,
          headers,
          body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
    }
  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: 'Internal Server Error', error: error.message }),
    };
  }
};
