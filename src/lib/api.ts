async function fetchGraphQL(query: string, variables = {}) {
  const token = localStorage.getItem("jwt");

  if (!token) {
    throw new Error("Authentication token not found");
  }

  try {
    const response = await fetch("https://learn.reboot01.com/api/graphql-engine/v1/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error(`GraphQL request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
      throw new Error(data.errors[0].message || "GraphQL query error");
    }

    return data.data;
  } catch (error) {
    console.error("GraphQL request error:", error);

    throw error;
  }
}

// New function to fetch user ID
export async function fetchUserId() {
  const query = `
{
  user {
    id
    login
    firstName
    lastName
    email
createdAt
  }
}
  `;

  const data = await fetchGraphQL(query);
  console.log("User ID:", data); // Log the user ID
  return [data.user[0].id, data.user[0].login, data.user[0].firstName, data.user[0].lastName, data.user[0].email, data.user[0].createdAt]; // Return the user ID
}


