import React from 'react';
import styles from './Icon.module.scss';
interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: 'sm' | 'md' | 'lg' | 'fill';
  className?: string;
}
const IconEmailCircle: React.FC<IconProps> = ({
  size = 'md',
  className = '',
  ...props
}) => <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.icon + ' ' + styles[size] + ' ' + 'icon' + ' ' + className} {...props}><circle cx={12} cy={12} r={9} fill="#9CA3AF" /><path d="M15.956 8.04199H8.04111C7.49697 8.04199 7.0567 8.4872 7.0567 9.03135L7.05176 14.9675C7.05176 15.5116 7.49697 15.9568 8.04111 15.9568H15.956C16.5001 15.9568 16.9453 15.5116 16.9453 14.9675V9.03135C16.9453 8.4872 16.5001 8.04199 15.956 8.04199ZM15.956 10.0207L11.9985 12.4941L8.04111 10.0207V9.03135L11.9985 11.5047L15.956 9.03135V10.0207Z" fill="white" /></svg>;
export default IconEmailCircle;