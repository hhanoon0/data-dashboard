let numberOfTransactions : number = 0; // Initialize the variable to store the number of transactions

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
export async function Audits() {
  const query = `query Audit {
  	user {
      auditRatio
      totalUp
      totalDown
    }
}
`;
const data = await fetchGraphQL(query);
return [data.user[0].auditRatio, data.user[0].totalUp, data.user[0].totalDown]; // Return the user ID

  console.log("audit info", data); // Log the user ID
// const query = `query Audit {
//   audit {
//       attrs
//       auditedAt
//       auditorId
//       auditorLogin
//       closedAt
//       closureMessage
//       closureType
//       createdAt
//       endAt
//       grade
//       groupId
//       id
//       resultId
//       updatedAt
//       version
//       auditor {
//           campus
//           canAccessPlatform
//           canBeAuditor
//           discordId
//           firstName
//           githubId
//           id
//           lastName
//           login
//           profile
//       }
//   }
//   user {
//     auditRatio
//     totalUp
//     totalDown
//   }
// }`

}
// `
// // query{
// //   transaction {

// //   amount
// // }
// // }





export async function Xps() {
  const query = `
query {
  transaction(
    where: {
      path: { _like: "/bahrain/bh-module%" }
      _not: {
        _or: [
          { path: { _like: "/bahrain/bh-module/piscine-js%" } }
          { path: { _like: "/bahrain/bh-module/checkpoint%" } }
        ]
      }
      type: { _nin: ["down", "up", "level"] }
    }
    order_by: { createdAt: asc }
  ) {
    path
    type
    amount
    createdAt
  }
}
`;


// `query {
//     transaction_aggregate(
//       where: { path: { _like: "/bahrain/bh-module%" } }
//     ) {
//       aggregate {
//         sum {
//           amount
//         }
//       }
//     }
//   }
//     `

  const data = await fetchGraphQL(query);
// Get the number of transactions
  console.log("xps:", data.transaction); // Log the user ID
  return data; // Return the user ID
}
Xps();
export async function XPsum() {
  const query = `
query {
  transaction_aggregate(
    where: {
      _or: [
        { path: { _eq: "/bahrain/bh-module/piscine-js" } },
        {
          _and: [
            { path: { _like: "/bahrain/bh-module%" } },
            { path: { _nlike: "%piscine-js/%" } },
            { path: { _nlike: "%piscine-rust/%" } },
          ]
        },
        { path: { _eq: "/bahrain/bh-module/rust-js" } }  # Added condition here
      ],
      type: { _eq: "xp" }
    }
  ) {
    aggregate {
      sum {
        amount
      }
    }
  }
}
    `;
    const data = await fetchGraphQL(query);
    


    console.log("XP total:", data.transaction);
    return data;
}
XPsum();

export async function Mke() {
const query = `query {
                    transaction(
                        where: {
                            _and: [
                                {type: { _iregex: "(^|[^[:alnum:]_])[[:alnum:]_]*skill_[[:alnum:]_]*($|[^[:alnum:]_])" }},
                                {type: {_like: "%skill%"}},
                                {object: {type: {_eq: "project"}}},
                                {type: {_in: [
                                    "skill_prog", "skill_algo", "skill_sys-admin", "skill_front-end", 
                                    "skill_back-end", "skill_stats", "skill_ai", "skill_game", 
                                    "skill_tcp"
                                ]}}
                            ]
                        }
                        order_by: [{type: asc}, {createdAt: desc}]
                        distinct_on: type
                    ) {
                        amount
                        type
                    }
                }`
    const data = await fetchGraphQL(query);
    console.log("skill info", data); // Log the user ID
    return data; // Return the user ID
}


export async function GetCodingskills() {
  const query = `query {
    transaction(
        where: {
            _and: [
                {type: { _iregex: "(^|[^[:alnum:]_])[[:alnum:]_]*skill_[[:alnum:]_]*($|[^[:alnum:]_])" }},
                {type: {_like: "%skill%"}},
                {object: {type: {_eq: "project"}}},
                {type: {_in: [
"skill_go", "skill_js", "skill_rust", "skill_css", "skill_html", "skill_sql", "skill_unix", "skill_docker"
                ]}}
            ]
        }
        order_by: [{type: asc}, {createdAt: desc}]
        distinct_on: type
    ) {
        amount
        type
    }
}`
const data = await fetchGraphQL(query);
    console.log("skill info", data); // Log the user ID
    return data; // Return the user ID
}



export async function TotalAudits() {
  const query = `query {
  transaction(
    where: {
      path: { _like: "/bahrain/bh-module%" }
      type: { _in: ["up", "down"] }
    }
    order_by: { createdAt: asc }
  ) {
    path
    type
    amount
    createdAt
  }
}
`;
const data = await fetchGraphQL(query);
numberOfTransactions = data.transaction.length;
console.log("total audit sum info :", numberOfTransactions) 
console.log("total audit sum info", data); // Log the user ID
return (numberOfTransactions);
}


export async function Userlevel() {

  const query =`{
  user {
    events(where: { eventId: { _in: [20, 72, 250, 763] } }) {
      id
      level
      eventId
      userId
    }
  }
}`;
const data = await fetchGraphQL(query);
const level = data.user[0].events[0].level;
console.log("Userlevel data", level); // Log the user ID
return level
}
