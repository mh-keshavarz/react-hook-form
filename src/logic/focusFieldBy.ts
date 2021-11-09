import { FieldRefs, InternalFieldName } from '../types';
import { get } from '../utils';
import isObject from '../utils/isObject';
import isUndefined from '../utils/isUndefined';
import omit from '../utils/omit';

const focusFieldBy = (
  fields: FieldRefs,
  callback: (name: string) => boolean,
  fieldsNames?: Set<InternalFieldName> | InternalFieldName[],
) => {
  for (const key of fieldsNames || Object.keys(fields)) {
    const field = get(fields, key);
    console.log('IN FOCUS')
    if (field) {
      console.log(field)
      const _f = field._f;
      const current = omit(field, '_f');

      if (_f && callback(_f.name)) {
        if (_f.ref.focus && isUndefined(_f.ref.focus())) {
          console.log('IN FOCUS loser')
          break;
        } else if (_f.refs) {
          console.log('IN FOCUS winner')
          _f.refs[0].focus();
          break;
        }
      } else if (isObject(current)) {
        focusFieldBy(current, callback);
      }
    }
  }
};

export default focusFieldBy;
