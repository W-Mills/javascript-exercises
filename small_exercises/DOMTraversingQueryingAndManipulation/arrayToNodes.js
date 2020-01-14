// Array to Nodes
// Implement a function that converts a nested array of nodeNames (see Nodes to Array exercise for examples) to nodes. Go over the sample code and the corresponing return values below as a guide for what you will implement.

//<body>
  // <header />
  // <main />
  // <footer />
// </body>;

// LS Solution:

function arrayToNodes(nodes) {
  const parent = document.createElement(nodes[0]);
  const children = nodes[1];

  if (children.length === 0) {
    return parent;
  } else {
    for (let i = 0; i < children.length; i += 1) {
      parent.appendChild(arrayToNodes(children[i]));
    }
  }

  return parent;
}

var nodes = ["BODY", [["HEADER", []], ["MAIN", []], ["FOOTER", []]]];

arrayToNodes(nodes);
