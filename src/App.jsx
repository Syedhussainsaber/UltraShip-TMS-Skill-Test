import React, { useState, useEffect } from 'react';
import { Menu, Grid, Layout, ChevronDown } from 'lucide-react';
import { GridView } from './components/GridView/GridView';
import { DetailView } from './components/DetailView/DetailView';
import { TileView } from './components/TileView/TileView';
import styles from './styles/dashboard.module.scss';

const menuItems = [
  {
    title: 'Dashboard',
    path: '/',
    icon: '📊'
  },
  {
    title: 'Employees',
    path: '/employees',
    icon: '👥',
    submenu: [
      { title: 'Directory', path: '/employees/directory' },
      { title: 'Management', path: '/employees/management' },
    ],
  },
  {
    title: 'Departments',
    path: '/departments',
    icon: '🏢',
    submenu: [
      { title: 'Overview', path: '/departments/overview' },
      { title: 'Structure', path: '/departments/structure' },
    ],
  },
  {
    title: 'Reports',
    path: '/reports',
    icon: '📈'
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: '⚙️'
  },
];

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        const enrichedData = data.map(user => ({
          ...user,
          department: ['Engineering', 'Marketing', 'Sales', 'HR'][Math.floor(Math.random() * 4)],
          salary: Math.floor(50000 + Math.random() * 50000),
          joinDate: new Date(2020 + Math.floor(Math.random() * 4), 
                            Math.floor(Math.random() * 12), 
                            Math.floor(Math.random() * 28))
                    .toISOString().split('T')[0],
          status: ['Active', 'On Leave', 'Remote'][Math.floor(Math.random() * 3)],
        }));
        setEmployees(enrichedData);
        setLoading(false);
      });
  }, []);

  const toggleSubmenu = (index) => {
    setActiveSubmenu(activeSubmenu === index ? null : index);
  };

  const MobileMenu = () => (
    <div className={`${styles.mobileOverlay} ${isMenuOpen ? styles.open : ''}`} onClick={() => setIsMenuOpen(false)}>
      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ''}`} onClick={(e) => e.stopPropagation()}>
        <div className={styles.mobileHeader}>
          <h2 className={styles.mobileTitle}>UltraShip TMS</h2>
          <button className={styles.mobileClose} onClick={() => setIsMenuOpen(false)}>
            ×
          </button>
        </div>
        <nav className={styles.mobileNav}>
          {menuItems.map((item, index) => (
            <div key={item.title} className={styles.mobileItem}>
              <button
                onClick={() => item.submenu && toggleSubmenu(index)}
                className={styles.mobileButton}
              >
                <span className={styles.mobileIcon}>{item.icon}</span>
                {item.title}
                {item.submenu && (
                  <ChevronDown 
                    className={`${styles.mobileArrow} ${activeSubmenu === index ? styles.open : ''}`}
                    size={16}
                  />
                )}
              </button>
              {item.submenu && activeSubmenu === index && (
                <div className={styles.mobileSubmenu}>
                  {item.submenu.map((subItem) => (
                    <button key={subItem.title} className={styles.mobileSubmenuItem}>
                      {subItem.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <button className={styles.menuButton} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu size={24} />
          </button>
          <h1 className={styles.logo}>UltraShip TMS</h1>
        </div>

        <nav className={styles.desktopNav}>
          {menuItems.map((item, index) => (
            <div key={index} className={styles.navItem}>
              <button className={styles.navButton}>
                <span className={styles.navIcon}>{item.icon}</span>
                {item.title}
                {item.submenu && <ChevronDown size={16} className={styles.navArrow} />}
              </button>
              
              {item.submenu && (
                <div className={styles.dropdown}>
                  {item.submenu.map((subItem, subIndex) => (
                    <button key={subIndex} className={styles.dropdownItem}>
                      {subItem.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className={styles.viewToggle}>
          <button
            className={`${styles.toggleButton} ${viewMode === 'grid' ? styles.active : ''}`}
            onClick={() => setViewMode('grid')}
          >
            <Grid size={20} />
          </button>
          <button
            className={`${styles.toggleButton} ${viewMode === 'tile' ? styles.active : ''}`}
            onClick={() => setViewMode('tile')}
          >
            <Layout size={20} />
          </button>
        </div>
      </header>

      <main className={styles.content}>
        {loading ? (
          <div className={styles.loader}>
            <div className={styles.spinner}></div>
            <span>Loading...</span>
          </div>
        ) : (
          <>
            {viewMode === 'grid' ? (
              <GridView employees={employees} onSelectEmployee={setSelectedEmployee} />
            ) : (
              <TileView employees={employees} onSelectEmployee={setSelectedEmployee} />
            )}
            {selectedEmployee && (
              <DetailView employee={selectedEmployee} onClose={() => setSelectedEmployee(null)} />
            )}
          </>
        )}
      </main>

      <MobileMenu />
    </div>
  );
};

export default App;