// src/index.ts
function hidePropertyIn(propertyGroups, _value, key, nestedPropIndex, nestedPropKey) {
  modifyProperty(
    (_, index, container) => container.splice(index, 1),
    propertyGroups,
    key,
    nestedPropIndex,
    nestedPropKey
  );
}
function hidePropertiesIn(propertyGroups, _value, keys) {
  keys.forEach(
    (key) => modifyProperty(
      (_, index, container) => container.splice(index, 1),
      propertyGroups,
      key,
      void 0,
      void 0
    )
  );
}
function hideNestedPropertiesIn(propertyGroups, _value, key, nestedPropIndex, nestedPropKeys) {
  nestedPropKeys.forEach(
    (nestedKey) => hidePropertyIn(propertyGroups, _value, key, nestedPropIndex, nestedKey)
  );
}
function changePropertyIn(propertyGroups, _value, modify, key, nestedPropIndex, nestedPropKey) {
  modifyProperty(modify, propertyGroups, key, nestedPropIndex, nestedPropKey);
}
function transformGroupsIntoTabs(properties) {
  const groups = [];
  properties.forEach((property) => {
    if (property.propertyGroups) {
      groups.push(...property.propertyGroups);
      property.propertyGroups = [];
    }
  });
  properties.push(...groups);
}
function modifyProperty(modify, propertyGroups, key, nestedPropIndex, nestedPropKey) {
  propertyGroups.forEach((propGroup) => {
    var _a;
    if (propGroup.propertyGroups) {
      modifyProperty(
        modify,
        propGroup.propertyGroups,
        key,
        nestedPropIndex,
        nestedPropKey
      );
    }
    (_a = propGroup.properties) == null ? void 0 : _a.forEach((prop, index, array) => {
      if (prop.key === key) {
        if (nestedPropIndex === void 0 || nestedPropKey === void 0) {
          modify(prop, index, array);
        } else if (prop.objects) {
          modifyProperty(
            modify,
            prop.objects[nestedPropIndex].properties,
            nestedPropKey
          );
        } else if (prop.properties) {
          modifyProperty(
            modify,
            prop.properties[nestedPropIndex],
            nestedPropKey
          );
        }
      }
    });
  });
}
function moveProperty(fromIndex, toIndex, properties) {
  if (fromIndex >= 0 && toIndex >= 0 && fromIndex < properties.length && toIndex < properties.length && fromIndex !== toIndex) {
    properties.splice(toIndex, 0, ...properties.splice(fromIndex, 1));
  }
}
export {
  changePropertyIn,
  hideNestedPropertiesIn,
  hidePropertiesIn,
  hidePropertyIn,
  moveProperty,
  transformGroupsIntoTabs
};
