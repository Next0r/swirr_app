const createElement = (
  name = "",
  id = "",
  attributes = [],
  attributeValues = []
) => {
  const element = document.createElement(name);
  element.id = id;

  for (let i = 0; i < attributes.length; i += 1) {
    const attribute = document.createAttribute(attributes[i]);

    if (attributeValues[i]) {
      attribute.value = attributeValues[i];
    }
    
    element.setAttributeNode(attribute);
  }

  return element;
};

module.exports = {
  createElement: createElement,
};
