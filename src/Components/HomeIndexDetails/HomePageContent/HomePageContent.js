import React from 'react';

const HomePageContent = ( {user} ) => {
    

    return (
        <div style={{ marginTop: '60px', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2 style={{ textAlign: 'center' }}>Welcome Mr.<b>{user}</b> to our Service_360 Dashboard</h2>
            <p style={{ marginTop: '20px', fontSize: '16px', lineHeight: '1.6' }}>
                <b>Service_360</b> is your centralized hub for project management and team collaboration. From this dashboard, you can seamlessly navigate through your projects, track progress, and manage your tasks with ease. Built for efficiency and designed for teams of all sizes, Service_360 ensures you stay connected and productive, wherever you are.
            </p>
            
            <h3 style={{ marginTop: '30px', fontWeight: 'bold' }}>What You Can Do:</h3>
            <ul style={{ marginLeft: '20px', marginTop: '10px', fontSize: '16px' }}>
                <li><b>Manage Projects:</b> Create, organize, and oversee projects with advanced planning tools.</li>
                <li><b>Track Progress:</b> Monitor tasks, milestones, and deadlines in real-time.</li>
                <li><b>Collaborate Effectively:</b> Work together with team members through seamless communication and shared workflows.</li>
                <li><b>Analyze Performance:</b> Generate detailed reports to gain insights into team productivity and project outcomes.</li>
            </ul>
            <h3 style={{ marginTop: '30px', fontWeight: 'bold' }}>Your Tools at a Glance:</h3>
            <p style={{ marginTop: '10px', fontSize: '16px', lineHeight: '1.6' }}>
                Explore key features directly from your dashboard:
            </p>
            <ul style={{ marginLeft: '20px', fontSize: '16px' }}>
                <li><b>Project Overview:</b> Get a bird's-eye view of all active projects and their statuses.</li>
                <li><b>Task Management:</b> Assign, prioritize, and track tasks with a user-friendly interface.</li>
                <li><b>Custom Workflows:</b> Tailor processes to fit your team’s unique requirements.</li>
                <li><b>Real-Time Notifications:</b> Stay updated on critical changes and developments.</li>
            </ul>
            <h3 style={{ marginTop: '30px', fontWeight: 'bold' }}>Getting Started</h3>
            <p style={{ marginTop: '10px', fontSize: '16px', lineHeight: '1.6' }}>
                Use the navigation menu to explore all the functionalities Service_360 has to offer. Whether you're managing a project, configuring settings, or analyzing data, everything you need is just a click away. Let’s get started and turn your goals into achievements!
            </p>
        </div>
    );
};

export default HomePageContent;
