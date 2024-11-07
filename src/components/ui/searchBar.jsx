import React, { useEffect, useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const location = useLocation();

    useEffect(() => {
        if (!location.pathname.includes('/search')) {
            setQuery('');
        }
    }, [location]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (onSearch && query.trim() !== '') {
            onSearch(query);
        }
    };

    return (
        <Form onSubmit={handleSearch} style={{ width: '100%', maxWidth: '600px' }}>
            <InputGroup>
                <Form.Control
                    type="text"
                    placeholder="Buscar..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    style={{
                        border: '1px solid #ddd',
                        borderRadius: '20px',
                        boxShadow: 'none',
                    }}
                />
                <InputGroup.Text style={{ border: 'none', backgroundColor: 'white', cursor: 'pointer' }} onClick={handleSearch}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </InputGroup.Text>
            </InputGroup>
        </Form>
    );
};

export default SearchBar;
