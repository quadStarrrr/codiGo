--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.1
-- Dumped by pg_dump version 9.6.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: questions; Type: TABLE; Schema: public; Owner: codi
--

CREATE TABLE questions (
    user_id integer,
    question_id integer NOT NULL,
    question_text text,
    create_time timestamp with time zone DEFAULT ('now'::text)::timestamp without time zone,
    status character varying(64),
    port_id integer,
    ip_address character varying(64)
);


ALTER TABLE questions OWNER TO codi;

--
-- Name: questions_question_id_seq; Type: SEQUENCE; Schema: public; Owner: codi
--

CREATE SEQUENCE questions_question_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE questions_question_id_seq OWNER TO codi;

--
-- Name: questions_question_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: codi
--

ALTER SEQUENCE questions_question_id_seq OWNED BY questions.question_id;


--
-- Name: responses; Type: TABLE; Schema: public; Owner: codi
--

CREATE TABLE responses (
    user_id integer,
    response_id integer NOT NULL,
    question_id integer,
    response_text text,
    create_time timestamp with time zone DEFAULT now(),
    status character varying(64),
    port_id integer,
    ip_address character varying(64),
    code_snippet text
);


ALTER TABLE responses OWNER TO codi;

--
-- Name: responses_response_id_seq; Type: SEQUENCE; Schema: public; Owner: codi
--

CREATE SEQUENCE responses_response_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE responses_response_id_seq OWNER TO codi;

--
-- Name: responses_response_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: codi
--

ALTER SEQUENCE responses_response_id_seq OWNED BY responses.response_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: codi
--

CREATE TABLE users (
    username character varying(64),
    password character varying(64),
    questions_asked integer DEFAULT 0,
    questions_answered integer DEFAULT 0,
    user_id integer NOT NULL,
    cookie_id character varying(256)
);


ALTER TABLE users OWNER TO codi;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: codi
--

CREATE SEQUENCE users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users_user_id_seq OWNER TO codi;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: codi
--

ALTER SEQUENCE users_user_id_seq OWNED BY users.user_id;


--
-- Name: questions question_id; Type: DEFAULT; Schema: public; Owner: codi
--

ALTER TABLE ONLY questions ALTER COLUMN question_id SET DEFAULT nextval('questions_question_id_seq'::regclass);


--
-- Name: responses response_id; Type: DEFAULT; Schema: public; Owner: codi
--

ALTER TABLE ONLY responses ALTER COLUMN response_id SET DEFAULT nextval('responses_response_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: codi
--

ALTER TABLE ONLY users ALTER COLUMN user_id SET DEFAULT nextval('users_user_id_seq'::regclass);


--
-- Data for Name: questions; Type: TABLE DATA; Schema: public; Owner: codi
--

COPY questions (user_id, question_id, question_text, create_time, status, port_id, ip_address) FROM stdin;
\.


--
-- Name: questions_question_id_seq; Type: SEQUENCE SET; Schema: public; Owner: codi
--

SELECT pg_catalog.setval('questions_question_id_seq', 1, false);


--
-- Data for Name: responses; Type: TABLE DATA; Schema: public; Owner: codi
--

COPY responses (user_id, response_id, question_id, response_text, create_time, status, port_id, ip_address, code_snippet) FROM stdin;
\.


--
-- Name: responses_response_id_seq; Type: SEQUENCE SET; Schema: public; Owner: codi
--

SELECT pg_catalog.setval('responses_response_id_seq', 1, false);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: codi
--

COPY users (username, password, questions_asked, questions_answered, user_id, cookie_id) FROM stdin;
kobe	lakers	\N	\N	1	\N
\N	\N	\N	\N	3	\N
bobby	hi	\N	\N	4	\N
\N	\N	\N	\N	5	\N
\.


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: codi
--

SELECT pg_catalog.setval('users_user_id_seq', 6, true);


--
-- Name: questions questions_pkey; Type: CONSTRAINT; Schema: public; Owner: codi
--

ALTER TABLE ONLY questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (question_id);


--
-- Name: responses responses_pkey; Type: CONSTRAINT; Schema: public; Owner: codi
--

ALTER TABLE ONLY responses
    ADD CONSTRAINT responses_pkey PRIMARY KEY (response_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: codi
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: codi
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: questions questions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: codi
--

ALTER TABLE ONLY questions
    ADD CONSTRAINT questions_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(user_id);


--
-- Name: responses responses_question_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: codi
--

ALTER TABLE ONLY responses
    ADD CONSTRAINT responses_question_id_fkey FOREIGN KEY (question_id) REFERENCES questions(question_id);


--
-- Name: responses responses_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: codi
--

ALTER TABLE ONLY responses
    ADD CONSTRAINT responses_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(user_id);


--
-- PostgreSQL database dump complete
--

