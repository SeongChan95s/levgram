import React from 'react';
import styles from './Icon.module.scss';
interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: 'sm' | 'md' | 'lg' | 'fill';
  className?: string;
}
const IconTwitter: React.FC<IconProps> = ({
  size = 'md',
  className = '',
  ...props
}) => <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.icon + ' ' + styles[size] + ' ' + 'icon' + ' ' + className} {...props}><path d="M17.175 4H19.9357L13.9058 10.9098L21 20.3125H15.4459L11.0955 14.6088L6.11737 20.3125H3.3555L9.80512 12.9213L3 4H8.69588L12.6277 9.21212L17.175 4ZM16.2075 18.6565H17.7375L7.86337 5.56937H6.22313L16.2075 18.6565Z" fill="black" /></svg>;
export default IconTwitter;