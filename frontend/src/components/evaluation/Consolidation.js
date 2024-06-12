import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Button, Input, Space, Table, AutoComplete, DatePicker, Typography, message, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import * as XLSX from 'xlsx';
import Highlighter from 'react-highlight-words';
import moment from 'moment';

const { Title } = Typography;
const { RangePicker } = DatePicker;

const Consolidation = () => {
    const url = 'http://172.16.0.92:8000/';
    const loggedInUser = sessionStorage.getItem('loginUser');
    const authorizedUsers = [
        "rakotobe.marco@npakadin.mg",
        "rakotorichard.jocelain@npakadin.mg",
        "razafimbelo.mariska@npakadin.mg",
        "andriamahonintsoa.rado@npakadin.mg",
        "direndre.sonal@npakadin.mg",
        "andriamandimbisoa.fy@npakadin.mg",
        "miadanarimanana.koloina@npakadin.mg",
        "rakotoson.roger@npakadin.mg",
    ];

    const [evaldata, setEvaldata] = useState([]);
    const [allfix, setAllfix] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
    const searchInput = useRef(null);

    useEffect(() => {
        fetchevalData();
    }, []);

    const fetchevalData = async () => {
        try {
            const response = await axios.get(`${url}fetchevaldata`);
            setEvaldata(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des données', error);
            message.error('Erreur lors de la récupération des données.');
        }
    };

    const handleSearchChange = (value) => {
        setSearchValue(value);
    };

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
        setSearchValue('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Rechercher ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Rechercher
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Réinitialiser
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filtrer
                    </Button>
                    <Button type="link" size="small" onClick={close}>
                        Fermer
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns = [
        {
            title: 'Mle',
            dataIndex: 'mat',
            key: 'mat',
            width: 90,
            ...getColumnSearchProps('mat'),
        },
        {
            title: "Nom",
            key: 'nom',
            dataIndex: 'nom',
            width: 200,
            ...getColumnSearchProps('nom'),
        },
        {
            title: "Prénom",
            key: 'prenom',
            dataIndex: 'prenom',
            width: 200,
            ...getColumnSearchProps('prenom'),
        },
        {
            title: "Poste",
            dataIndex: 'posteeval',
            key: 'posteeval',
            width: 150,
            ...getColumnSearchProps('posteeval'),
        },
        {
            title: "Date d'entretien",
            dataIndex: 'dateEntretien',
            key: 'dateEntretien',
            width: 150,
            render: (text) => moment(text).format('DD/MM/YYYY HH:mm:ss'),
        },
        {
            title: 'Évaluateur',
            dataIndex: 'nomeval',
            key: 'nomeval',
            width: 150,
            ...getColumnSearchProps('nomeval'),
            render: (text) => (
                text ? text.split(' ').map(word =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                ).join(' ') : ''
            ),
        },
        {
            title: 'Résultat obj. indiv. %',
            dataIndex: 'res1',
            key: 'res1',
            width: 120,
        },
        {
            title: 'Éval. prof. /5',
            dataIndex: 'r4',
            key: 'r4',
            width: 120,
            render: (text) => text !== undefined && text !== null ? Number(text).toFixed(2) : 'N/A',
        },
        {
            title: 'Aptitude prof. /5',
            dataIndex: 'aptitudeProfessionnelle',
            key: 'aptitudeProfessionnelle',
            width: 150,
        },
        {
            title: 'Comportemental /5',
            dataIndex: 'comportemental',
            key: 'comportemental',
            width: 150,
        },
        {
            title: 'Niveau actuel',
            dataIndex: 'nivactus',
            key: 'nivactus',
            width: 120,
        },
        {
            title: 'Performance %',
            dataIndex: 'performance',
            key: 'performance',
            width: 120,
        },
        {
            title: 'Interprétation des résultats',
            dataIndex: 'idr',
            key: 'idr',
            width: 200,
            render: (text) => (
                <Tooltip title={text}>
                    <span>{text && text.length > 20 ? `${text.slice(0, 20)}...` : text}</span>
                </Tooltip>
            ),
        },
        {
            title: 'Forces',
            dataIndex: 'forces',
            key: 'forces',
            width: 200,
            render: (text) => (
                <Tooltip title={text}>
                    <span>{text && text.length > 20 ? `${text.slice(0, 20)}...` : text}</span>
                </Tooltip>
            ),
        },
        {
            title: 'Faiblesses',
            dataIndex: 'faiblesses',
            key: 'faiblesses',
            width: 200,
            render: (text) => (
                <Tooltip title={text}>
                    <span>{text && text.length > 20 ? `${text.slice(0, 20)}...` : text}</span>
                </Tooltip>
            ),
        },
        {
            title: "Formations suivies",
            dataIndex: 'formationsSuivies',
            key: 'formationsSuivies',
            width: 200,
            render: (text) => (
                <Tooltip title={text}>
                    <span>{text && text.length > 20 ? `${text.slice(0, 20)}...` : text}</span>
                </Tooltip>
            ),
        },
        {
            title: 'Besoins en développement',
            dataIndex: 'besoinDeveloppement',
            key: 'besoinDeveloppement',
            width: 200,
            render: (text) => (
                <Tooltip title={text}>
                    <span>{text && text.length > 20 ? `${text.slice(0, 20)}...` : text}</span>
                </Tooltip>
            ),
        },
        {
            title: 'Projet professionnel',
            dataIndex: 'projetProfessionnel',
            key: 'projetProfessionnel',
            width: 200,
            render: (text) => (
                <Tooltip title={text}>
                    <span>{text && text.length > 20 ? `${text.slice(0, 20)}...` : text}</span>
                </Tooltip>
            ),
        },
        {
            title: 'Objectif pour 2024',
            dataIndex: 'objectif2024',
            key: 'objectif2024',
            width: 200,
            render: (text) => (
                <Tooltip title={text}>
                    <span>{text && text.length > 20 ? `${text.slice(0, 20)}...` : text}</span>
                </Tooltip>
            ),
        },
        {
            title: 'Observations',
            dataIndex: 'observations',
            key: 'observations',
            width: 200,
            render: (text) => (
                <Tooltip title={text}>
                    <span>{text && text.length > 20 ? `${text.slice(0, 20)}...` : text}</span>
                </Tooltip>
            ),
        },
        {
            title: "Planning d'entretien",
            dataIndex: 'planningEntretien',
            key: 'planningEntretien',
            width: 200,
            render: (text) => (
                <Tooltip title={text}>
                    <span>{text && text.length > 20 ? `${text.slice(0, 20)}...` : text}</span>
                </Tooltip>
            ),
        },
    ];

    const filteredData = useMemo(() => {
        return evaldata
            .filter((item) => {
                const fixeValue = item.EXT || '';
                const match = allfix.find((fix) => fix.tel === fixeValue);
                const prenom = match ? match.nom.toLowerCase() : '';
                const nom = item.nom.toLowerCase();
                const searchTextLower = searchValue.toLowerCase();
                return (
                    prenom.includes(searchTextLower) ||
                    nom.includes(searchTextLower)
                );
            })
            .map((item) => {
                const fixeValue = item.EXT || '';
                const match = allfix.find((fix) => fix.tel === fixeValue);
                const prenom = match ? match.nom.toLowerCase() : '';
                return { ...item, prenom };
            });
    }, [evaldata, searchValue, allfix]);

    if (!authorizedUsers.includes(loggedInUser)) {
        return (
            <div>
                <h1>Accès refusé</h1>
                <p>Vous n'avez pas l'autorisation d'accéder à cette page.</p>
            </div>
        );
    }

    const handleTableChange = (pagination) => {
        setPagination(pagination);
    };

    const exportToExcel = () => {
        const formattedData = filteredData.map((row) => ({
            'Mle': row.mat,
            'Nom et prénom': row.nom,
            'Poste': row.posteeval,
            'Date d\'entretien': moment(row.dateEntretien).format('DD/MM/YYYY HH:mm:ss'),
            'Evaluateur': row.nomeval.split(' ').map(word =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            ).join(' '),
            'Résultat objectif individuel %': row.res1,
            'Evaluation professionnelle /5': row.r4,
            'Aptitude professionnelle /5': row.aptitudeProfessionnelle,
            'Comportemental /5': row.comportemental,
            'Niveau actuel': row.nivactus,
            'Performance %': row.performance,
            'Interprétation des résultats': row.idr,
            'Forces': row.forces,
            'Faiblesse': row.faiblesses,
            "Formations suivies au cours de l'année": row.formationsSuivies,
            'Besoin en développement de compétences': row.besoinDeveloppement,
            'Projet professionnel': row.projetProfessionnel,
            'Objectif pour 2024': row.objectif2024,
            'Observations': row.observations,
            "Planning d'entretien individuel": row.planningEntretien,
        }));
        
        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Données');

        const excelBuffer = XLSX.write(workbook, {
            bookType: 'xlsx',
            type: 'array',
        });

        const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
        const excelURL = URL.createObjectURL(data);

        const tempLink = document.createElement('a');
        tempLink.href = excelURL;
        tempLink.setAttribute('download', 'data.xlsx');
        tempLink.click();
    };

    return (
        <div style={{ padding: '20px' ,marginTop:'200px',textAlign:'center' }}>
            <Title level={3}>Consolidation des données</Title>
            <Space style={{ marginBottom: 16 }}>
                <AutoComplete
                    options={evaldata.map((item) => ({ value: item.nom }))}
                    style={{ width: 200 }}
                    value={searchValue}
                    onChange={handleSearchChange}
                    placeholder="Rechercher par nom"
                    filterOption={(inputValue, option) =>
                        option.value.toLowerCase().includes(inputValue.toLowerCase())
                    }
                />
                <Button type="primary" onClick={exportToExcel}>
                    Exporter vers Excel
                </Button>
            </Space>
            <Table
                columns={columns}
                dataSource={filteredData}
                pagination={pagination}
                onChange={handleTableChange}
                scroll={{ x: 2000, y: 600 }}
                rowKey="mat"
            />
        </div>
    );
};

export default Consolidation;
