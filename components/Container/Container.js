import cn from 'classnames';
import s from '../../styles/Container.module.scss';

const Container = ({children}) => {
    return (
        <div className={cn(s.container, s.gradient)}>
            {children}
        </div>
    );
};

export default Container;