const RULES_VALIDATION_DATA_LOGIN = {
  login: {
    email: {
      required: true,
      formatEmail: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
    },
    password: {
      required: true,
      length: 6,
    },
  },
  register: {
    email: {
      required: true,
    },
    password: {
      required: true,
    },
  },
};
const INPUTS_VALID = {
  login: {
    email: {
      valid: false,
      typeMessage: "",
    },
    password: {
      valid: false,
      typeMessage: "",
    },
  },
  register: {
    email: {
      valid: false,
      typeMessage: "",
    },
    password: {
      valid: false,
      typeMessage: "",
    },
  },
};

function validateInput(form, id) {
  const formGroup = document.querySelector(`#form-${form}`);
  const button = formGroup.querySelector(`#main-btn-${form}`);
  button.disabled = true;
  const input = formGroup.querySelector(`#${id}`);
  const value = input.value;
  const rules = RULES_VALIDATION_DATA_LOGIN[form][id];
  const inputsForm = INPUTS_VALID[form];

  getValidations(id, inputsForm, value, rules);
  printMessageError(id, inputsForm, rules, formGroup);

  const keys = Object.keys(inputsForm);
  if (keys.every((key) => inputsForm[key].valid)) {
    button.disabled = false;
  } else {
    button.disabled = true;
  }
}

function getValidations(id, inputForm, value, rules) {
  const rulesKeys = Object.keys(rules);
  for (const rule of rulesKeys) {
    switch (rule) {
      case "required":
        inputForm[id].valid = validRequired(value);
        break;
      case "length":
        inputForm[id].valid = validLength(value, rules[rule]);
        break;
      case "formatEmail":
        inputForm[id].valid = validEmail(value, rules[rule]);
        break;
    }
    if (!inputForm[id].valid) {
      inputForm[id].typeMessage = rule;
      break;
    } else {
      inputForm[id].typeMessage = "";
    }
  }
}

function validRequired(value) {
  return value.trim() !== "";
}
function validLength(value, length) {
  return value.length >= length;
}
function validEmail(value, format) {
  return format.test(value);
}

function printMessageError(id, inputForm, rules, formGroup) {
  const typeMessage = inputForm[id].typeMessage;
  if (typeMessage !== "") {
    clearMessages(id, rules, formGroup);
    const input = formGroup.querySelector(`#${id}`);
    const message = formGroup.querySelector(`.${id}-${typeMessage}`);
    message.style.display = "block";
    input.parentNode.classList.add("error");
  } else {
    clearMessages(id, rules, formGroup);
  }
}

function clearMessages(id, rules, formGroup) {
  const rulesKeys = Object.keys(rules);
  for (const rule of rulesKeys) {
    const input = formGroup.querySelector(`#${id}`);
    const message = formGroup.querySelector(`.${id}-${rule}`);
    message.style.display = "none";
    input.parentNode.classList.remove("error");
  }
}
