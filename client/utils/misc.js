import R from 'ramda';

export const mapBy = identifier => arr => R.zipObj(
  R.pluck(identifier, arr),
  arr
);

export const mapByRecnum = mapBy('recnum');
