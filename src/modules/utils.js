export const validateForm = (
  str, required = false, minLength = 0, maxLength = 0, specialChar = true,
) => {
  let isError = false;
  let msg = '';
  str = str.trim();
  const len = str.length;

  if (required) {
    if (str.length <= 0) {
      isError = true;
      msg = 'This field is Required!';
      return { isError, msg };
    }
  }

  if (minLength > 0) {
    if (len < minLength) {
      isError = true;
      msg = `The min character length of this field is ${minLength}`;
      return { isError, msg };
    }
  }

  if (maxLength > 0) {
    if (len > maxLength) {
      isError = true;
      msg = `The max character length of this field is ${maxLength}`;
      return { isError, msg };
    }
  }

  if (!specialChar) {
    const newStr = str.replace(/\s/g, '');
    const re = /^[A-Za-z][A-Za-z0-9-_.]*$/;
    if (!re.test(newStr)) {
      isError = true;
      msg = 'This field is only allow A-z0-9_.- characters and also first character should be A-z';
      return { isError, msg };
    }
  }
  return { isError, msg };
};

export const getAfterElement = (todoContainer, y) => {
  const dragFilterElements = [...todoContainer.querySelectorAll('.todo-item:not(.dragging)')];

  return dragFilterElements.reduce((nearest, item) => {
    // get the box content
    const box = item.getBoundingClientRect();

    // calculate the offset
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > nearest.offset) {
      return { offset, element: item };
    }
    return nearest;
  }, { offset: Number.NEGATIVE_INFINITY }).element;
};