import React from 'react';
import styles from './Icon.module.scss';
interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: 'sm' | 'md' | 'lg' | 'fill';
  className?: string;
}
const IconGridCol1Filled: React.FC<IconProps> = ({
  size = 'md',
  className = '',
  ...props
}) => <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.icon + ' ' + styles[size] + ' ' + 'icon' + ' ' + className} {...props}><path d="M18.9178 3.54495C19.3423 3.54495 19.6864 3.88908 19.6864 4.31359C19.6864 4.7381 19.3423 5.08223 18.9178 5.08223H5.08224C4.65773 5.08223 4.3136 4.7381 4.3136 4.31359C4.3136 3.88908 4.65773 3.54495 5.08224 3.54495H18.9178Z" fill="black" /><path d="M17.3805 17.3805C18.654 17.3805 19.6864 16.3481 19.6864 15.0746V8.92546C19.6864 7.65193 18.654 6.61954 17.3805 6.61954H6.61952C5.34599 6.61954 4.3136 7.65193 4.3136 8.92546V15.0746C4.3136 16.3481 5.34599 17.3805 6.61952 17.3805H17.3805Z" fill="black" /><path d="M18.9178 18.9178C19.3423 18.9178 19.6864 19.2619 19.6864 19.6864C19.6864 20.1109 19.3423 20.4551 18.9178 20.4551H5.08224C4.65773 20.4551 4.3136 20.1109 4.3136 19.6864C4.3136 19.2619 4.65773 18.9178 5.08224 18.9178H18.9178Z" fill="black" /></svg>;
export default IconGridCol1Filled;