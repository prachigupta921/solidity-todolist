import type { NextPage } from 'next'
import Head from 'next/head'
import { VStack, HStack, Heading, Text, Button, Input, Box, Spacer, Spinner } from '@chakra-ui/react'
import React from 'react'
import { load } from '../src/funcs';

const Home: NextPage = () => {
  const [input, setInput] = React.useState<string>('');
  const [refresh, setRefresh] = React.useState<boolean>(true);
  const [addressAccount, setAddresAccount] = React.useState<any>(null);
  const [contract, setContract] = React.useState<any>(null);
  const [tasks, setTasks] = React.useState<any[]>([]);

  

  // Handlers

  const handleInputChange = (e:any) => setInput(e.currentTarget.value);
  const handleAddTask = async () => {
    await contract.createTask(input, {from: addressAccount});
    setInput('');
    setRefresh(true);
  };
  const handleToggled = async (id: number) => {
    await contract.toggleCompleted(id, {from: addressAccount});
    setRefresh(true);
  };


  // React useEffect

  React.useEffect(() => {
    if (!refresh) return;
    setRefresh(false);
    load().then((e) => {
      setAddresAccount(e.addressAccount);
      setTasks(e.tasks);
      setContract(e.todoContract);
    });
  });

  return (
    <VStack>
        <Head>
          <title>Todo List</title>
          <meta name="description" content="Blockchain TodoList." />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <HStack w='full'>
          <Spacer />
          <VStack>
            <Heading>Blockchain TodoList</Heading>
            <Box h='30px'/>
            <HStack w='md'>
              <Input
              type='text'
              size='md'
              placeholder='New Task...'
              onChange={handleInputChange}
              value={input}
              />
              <Button onClick={handleAddTask} bg='green.200'>ADD</Button>
            </HStack>
            <Box h='30px' />
            <Text>ToDO</Text>
            {
              tasks == null ? <Spinner />
              : tasks.map((task, idx) => !task[2] ?
              <HStack key={idx} w='md' bg='gray.100' borderRadius={7}>
                <Box w='5px' />
                <Text>{task[1]}</Text>
                <Spacer />
                <Button bg='green.300' onClick={ () => handleToggled(task[0].toNumber()) }>DONE</Button>
              </HStack> : null
              )
            }
            <Box h='10px' />
            <Text>Tasks done</Text>
            {
              tasks == null ? <Spinner /> :
              tasks.map((task, idx) => task[2] ?
              <HStack key={idx} w='md' bg='gray.100' borderRadius={7}>
                <Box w='5px' />
                <Text>{task[1]}</Text>
                <Spacer />
                <Button bg='red.300' onClick={ () => handleToggled(task[0].toNumber() ) }>UNDONE</Button>
              </HStack> : null
              )
            }
          </VStack>
          <Spacer />
        </HStack>
    </VStack>
  )
}

export default Home



















/*import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { VStack, HStack, Heading, Text, Button, Input, Box, Spacer } from '@chakra-ui/react'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Todo List</title>
        <meta name="description" content="Blockchain Todolist" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HStack w='full'>
        <Spacer />
        <VStack>
          <Heading>Blockchain TodoList</Heading>
          <Box h='30px' />
          <Input type='text'
          size='md'
          placeholder='New Task...'
          onChange={handleInputChange}
          value={input}
          />
          <Button onClick={handleAddTask}>Add</Button>
        </VStack>
      </HStack>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
*/