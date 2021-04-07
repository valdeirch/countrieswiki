import produce from "immer";

const INITIAL_STATE = {
  countries: [],
};

export default function country(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case "@country/EDIT_DATA": {
        const index = draft.countries.findIndex((element) => element.countryId === action.payload.countryId);
        if (index >= 0) {
          draft.countries[index] = action.payload;
        } else {
          draft.countries.push(action.payload);
        }
        break;
      }
      default:
    }
  });
}
