import React, {useEffect, useRef} from 'react';
import './sidebar.css';

const Sidebar = () => {
    const sidebarRef = useRef(null);
    const wrapperRef = useRef(null);

    useEffect(() => {
        // Handle sidebar toggle
        const showAsideBtn = document.querySelector('.show-side-btn');
        const sidebar = sidebarRef.current;
        const wrapper = wrapperRef.current;

        const toggleSidebar = () => {
            sidebar.classList.toggle('show-sidebar');
            wrapper.classList.toggle('fullwidth');
        };

        //showAsideBtn.addEventListener('click', toggleSidebar);

        const handleResize = () => {
            if (window.innerWidth > 767) {
                sidebar.classList.remove('show-sidebar');
            }
        };

        //window.addEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <aside className="sidebar position-fixed top-0 left-0 overflow-auto h-100 float-left"
                   id="show-side-navigation1">
                <i className="uil-bars close-aside d-md-none d-lg-none" data-close="show-side-navigation1"></i>
                <div className="sidebar-header d-flex justify-content-center align-items-center px-3 py-4">
                    <img
                        className="rounded-pill img-fluid"
                        width="65"
                        src="https://uniim1.shutterfly.com/ng/services/mediarender/THISLIFE/021036514417/media/23148907008/medium/1501685726/enhance"
                        alt=""
                    />
                    <div className="ms-2">
                        <h5 className="fs-6 mb-0">
                            <a className="text-decoration-none" href="#">Jone Doe</a>
                        </h5>
                        <p className="mt-1 mb-0">Lorem ipsum dolor sit amet consectetur.</p>
                    </div>
                </div>

                <div className="search position-relative text-center px-4 py-3 mt-2">
                    <input type="text" className="form-control w-100 border-0 bg-transparent"
                           placeholder="Search here"/>
                    <i className="fa fa-search position-absolute d-block fs-6"></i>
                </div>

                <ul className="categories list-unstyled">
                    <li className="has-dropdown">
                        <i className="uil-estate fa-fw"></i>
                        <a href="#">Dashboard</a>
                        <ul className="sidebar-dropdown list-unstyled">
                            <li><a href="#">Lorem ipsum</a></li>
                            <li><a href="#">ipsum dolor</a></li>
                            <li><a href="#">dolor ipsum</a></li>
                            <li><a href="#">amet consectetur</a></li>
                            <li><a href="#">ipsum dolor sit</a></li>
                        </ul>
                    </li>
                    <li><i className="uil-folder"></i><a href="#">File manager</a></li>
                    {/* 추가적인 항목들 */}
                    <li className="has-dropdown">
                        <i className="uil-calendar-alt"></i>
                        <a href="#">Calendar</a>
                        <ul className="sidebar-dropdown list-unstyled">
                            <li><a href="#">Lorem ipsum</a></li>
                            <li><a href="#">ipsum dolor</a></li>
                            <li><a href="#">dolor ipsum</a></li>
                            <li><a href="#">amet consectetur</a></li>
                            <li><a href="#">ipsum dolor sit</a></li>
                        </ul>
                    </li>
                    {/* 더 많은 항목을 추가할 수 있습니다 */}
                </ul>
            </aside>
        </>
    )
}

export default Sidebar;