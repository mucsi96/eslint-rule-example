import { t } from './i18n';
import 'fs';

import styles from './test.module.css';

import a from 'a/dist';

const a = 'hello';

console.log(t('hello'));
console.log(t(`hello`));
console.log(t(a));

console.log(styles.container)
console.log(styles.containere)
