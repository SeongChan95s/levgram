import { useRef, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { classNames } from '../../../utils/classNames';
import styles from './Modal.module.scss';

interface ModalProps {
	className?: string;
	visible: boolean;
	children: React.ReactNode;
}

export default function Modal({ className: classNameProp, visible, children }: ModalProps) {
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (visible) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [visible]);

	const className = classNames(styles.modal, classNameProp);

	return (
		<CSSTransition
			nodeRef={modalRef}
			in={visible}
			timeout={{ enter: 300, exit: 300 }}
			mountOnEnter
			unmountOnExit>
			<div ref={modalRef} className={className}>
				{children}
			</div>
		</CSSTransition>
	);
}
