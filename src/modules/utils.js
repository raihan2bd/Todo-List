
export const validateForm = (str, required=false, minLength=0, maxLength=0, specialChar = true) =>  {
  let isError = false;
  let msg = '';
  str = str.trim();
  const len = str.length;

  if(required) {
    if(str.length<=0) {
      isError = true;
      msg = 'This field is Required!';
      return {isError, msg}
    }
  }

  if(minLength>0) {
    if(len<minLength) {
      isError = true;
      msg = `The min character length of this field is ${minLength}`;
      return {isError, msg};
    }
  };

  if(maxLength>0) {
    if(len>maxLength) {
      isError = true;
      msg = `The max character length of this field is ${maxLength}`;
      return {isError, msg}
    }
  };

  if(!specialChar) {
    const re = /^[A-Za-z][A-Za-z0-9-_.]*$/
    if(!re.test(str)) {
      isError = true,
      msg = "This field is only allow A-z0-9_.- characters and also first character should be A-z";
      return {isError, msg}
    }
  };
  return {isError, msg}
  }