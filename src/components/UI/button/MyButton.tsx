
import classes from './MyButton.module.css';

import { ButtonHTMLAttributes, ReactNode } from 'react';

interface MyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

const MyButton = ({children, ...props}: MyButtonProps) => {
    return (
        <button {...props} className={classes.myBtn}>
            {children}
        </button>
    );
};

export default MyButton;