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
    userid integer,
    questionid integer NOT NULL,
    questiontext text,
    createtime timestamp without time zone,
    status character varying(64),
    portid integer,
    ipaddress character varying(64)
);


ALTER TABLE questions OWNER TO codi;

--
-- Name: questions_questionid_seq; Type: SEQUENCE; Schema: public; Owner: codi
--

CREATE SEQUENCE questions_questionid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE questions_questionid_seq OWNER TO codi;

--
-- Name: questions_questionid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: codi
--

ALTER SEQUENCE questions_questionid_seq OWNED BY questions.questionid;


--
-- Name: responses; Type: TABLE; Schema: public; Owner: codi
--

CREATE TABLE responses (
    responseid integer NOT NULL,
    questionid integer,
    responsetext text,
    createtime timestamp without time zone,
    status character varying(64),
    portid integer,
    ipaddress character varying(64),
    codesnippet text
);


ALTER TABLE responses OWNER TO codi;

--
-- Name: responses_responseid_seq; Type: SEQUENCE; Schema: public; Owner: codi
--

CREATE SEQUENCE responses_responseid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE responses_responseid_seq OWNER TO codi;

--
-- Name: responses_responseid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: codi
--

ALTER SEQUENCE responses_responseid_seq OWNED BY responses.responseid;


--
-- Name: users; Type: TABLE; Schema: public; Owner: codi
--

CREATE TABLE users (
    username character varying(64),
    password character varying(64),
    questionsasked integer,
    questionsanswered integer,
    userid integer NOT NULL
);


ALTER TABLE users OWNER TO codi;

--
-- Name: users_userid_seq; Type: SEQUENCE; Schema: public; Owner: codi
--

CREATE SEQUENCE users_userid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users_userid_seq OWNER TO codi;

--
-- Name: users_userid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: codi
--

ALTER SEQUENCE users_userid_seq OWNED BY users.userid;


--
-- Name: questions questionid; Type: DEFAULT; Schema: public; Owner: codi
--

ALTER TABLE ONLY questions ALTER COLUMN questionid SET DEFAULT nextval('questions_questionid_seq'::regclass);


--
-- Name: responses responseid; Type: DEFAULT; Schema: public; Owner: codi
--

ALTER TABLE ONLY responses ALTER COLUMN responseid SET DEFAULT nextval('responses_responseid_seq'::regclass);


--
-- Name: users userid; Type: DEFAULT; Schema: public; Owner: codi
--

ALTER TABLE ONLY users ALTER COLUMN userid SET DEFAULT nextval('users_userid_seq'::regclass);


--
-- Data for Name: questions; Type: TABLE DATA; Schema: public; Owner: codi
--

COPY questions (userid, questionid, questiontext, createtime, status, portid, ipaddress) FROM stdin;
\.


--
-- Name: questions_questionid_seq; Type: SEQUENCE SET; Schema: public; Owner: codi
--

SELECT pg_catalog.setval('questions_questionid_seq', 1, false);


--
-- Data for Name: responses; Type: TABLE DATA; Schema: public; Owner: codi
--

COPY responses (responseid, questionid, responsetext, createtime, status, portid, ipaddress, codesnippet) FROM stdin;
\.


--
-- Name: responses_responseid_seq; Type: SEQUENCE SET; Schema: public; Owner: codi
--

SELECT pg_catalog.setval('responses_responseid_seq', 1, false);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: codi
--

COPY users (username, password, questionsasked, questionsanswered, userid) FROM stdin;
\.


--
-- Name: users_userid_seq; Type: SEQUENCE SET; Schema: public; Owner: codi
--

SELECT pg_catalog.setval('users_userid_seq', 1, false);


--
-- Name: questions questions_pkey; Type: CONSTRAINT; Schema: public; Owner: codi
--

ALTER TABLE ONLY questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (questionid);


--
-- Name: responses responses_pkey; Type: CONSTRAINT; Schema: public; Owner: codi
--

ALTER TABLE ONLY responses
    ADD CONSTRAINT responses_pkey PRIMARY KEY (responseid);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: codi
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (userid);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: codi
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: questions questions_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: codi
--

ALTER TABLE ONLY questions
    ADD CONSTRAINT questions_userid_fkey FOREIGN KEY (userid) REFERENCES users(userid);


--
-- Name: responses responses_questionid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: codi
--

ALTER TABLE ONLY responses
    ADD CONSTRAINT responses_questionid_fkey FOREIGN KEY (questionid) REFERENCES questions(questionid);


--
-- PostgreSQL database dump complete
--

