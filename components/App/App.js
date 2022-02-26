import Head from 'next/head'
import Container from '../Container/Container';
import InputField from '../ToDoList/ToDoList';
import cn from 'classnames';
import s from '../../styles/App.module.scss';

const App = () => {

    return (
        <>
            <Head>
                <title>ToDo NextJS Test</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Container>
                <h1 className={cn(s.heading)}>My ToDo App</h1>
                <InputField/>
            </Container>
        </>
    );
};

export default App;