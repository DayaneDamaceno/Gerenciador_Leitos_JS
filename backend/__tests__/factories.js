import faker from 'faker';
import { factory } from 'factory-girl';

import Hospital from '../src/app/models/Hospital';

factory.define('Hospital', Hospital, {
  name: faker.company.companyName(),
});

export default factory;
