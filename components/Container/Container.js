import cn from 'classnames';
import s from '../../styles/Container.module.scss';
import { motion } from 'framer-motion';

const Container = ({ children }) => {
    return (
        <>
            <motion.div initial="hidden" animate="visible" variants={{
                hidden: {
                    scale: .8,
                    opacity: 0
                },
                visible: {
                    scale: 1,
                    opacity: 1,
                    transition: {
                        delay: .4
                    }
                }
            }}>
                <div className={cn(s.container, s.gradient)}>
                    {children}
                </div>
            </motion.div>
        </>
    );
};

export default Container;