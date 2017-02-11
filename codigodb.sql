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
-- Name: issues; Type: TABLE; Schema: public; Owner: codi
--

CREATE TABLE issues (
    userid integer,
    questionid integer NOT NULL,
    questiontext text,
    createtime timestamp without time zone,
    status character varying(64),
    portid integer,
    ipaddress character varying(64)
);


ALTER TABLE issues OWNER TO codi;

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
    codesnippet text,
    userid integer NOT NULL
);


ALTER TABLE responses OWNER TO codi;

--
-- Name: users; Type: TABLE; Schema: public; Owner: codi
--

CREATE TABLE users (
    username character varying(64),
    password character varying(256),
    questionsasked integer,
    questionsanswered integer,
    userid integer NOT NULL
);


ALTER TABLE users OWNER TO codi;

--
-- Data for Name: issues; Type: TABLE DATA; Schema: public; Owner: codi
--

COPY issues (userid, questionid, questiontext, createtime, status, portid, ipaddress) FROM stdin;
\.


--
-- Data for Name: responses; Type: TABLE DATA; Schema: public; Owner: codi
--

COPY responses (responseid, questionid, responsetext, createtime, status, portid, ipaddress, codesnippet, userid) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: codi
--

COPY users (username, password, questionsasked, questionsanswered, userid) FROM stdin;
\.


--
-- Name: issues issues_pkey; Type: CONSTRAINT; Schema: public; Owner: codi
--

ALTER TABLE ONLY issues
    ADD CONSTRAINT issues_pkey PRIMARY KEY (questionid);


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
-- Name: issues issues_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: codi
--

ALTER TABLE ONLY issues
    ADD CONSTRAINT issues_userid_fkey FOREIGN KEY (userid) REFERENCES users(userid);


--
-- Name: responses responses_questionid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: codi
--

ALTER TABLE ONLY responses
    ADD CONSTRAINT responses_questionid_fkey FOREIGN KEY (questionid) REFERENCES issues(questionid);


--
-- Name: responses responses_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: codi
--

ALTER TABLE ONLY responses
    ADD CONSTRAINT responses_userid_fkey FOREIGN KEY (responseid) REFERENCES users(userid);


--
-- PostgreSQL database dump complete
--

