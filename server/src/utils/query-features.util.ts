import { Types } from 'mongoose';

export class QueryFeatures {
  model: any;
  queryString: any;

  constructor(model: any, queryString: any) {
    this.model = model;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = {...this.queryString};
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach(el => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj)
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt|nin|in)\b/g,
      match => `$${match}`
    );

    const filterObj = JSON.parse(queryStr);

    Object.keys(filterObj).map(key => {
      if (typeof filterObj[key] === 'object') {
        Object.keys(filterObj[key]).map(innerkey => {
          if (innerkey === '$nin' || innerkey === '$in') {
            filterObj[key][innerkey] = filterObj[key][innerkey]
              .split(',')
              .map(arr => {
                if (key.endsWith("Id") || key === '_id') {
                  return new Types.ObjectId(arr);
                }
                return arr;
              });
          }
        });
      } else {
        if (key.endsWith("Id") || key === '_id') {
          filterObj[key] = new Types.ObjectId(filterObj[key]);
        }
      }
    });

    this.model = this.model.find(filterObj);

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.model = this.model.sort(sortBy);
    } else {
      this.model = this.model.sort('-createdAt');
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.model = this.model.select(fields);
    } else {
      this.model = this.model.select('-__v');
    }

    return this
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * 100;

    this.model = this.model.skip(skip).limit(limit);

    return this
  }
}
