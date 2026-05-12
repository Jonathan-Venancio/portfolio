import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Projetos</p>
              <p className="text-2xl font-bold text-gray-800">11</p>
            </div>
            <div className="text-3xl">🚀</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Skills</p>
              <p className="text-2xl font-bold text-gray-800">6</p>
            </div>
            <div className="text-3xl">💡</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Categorias</p>
              <p className="text-2xl font-bold text-gray-800">3</p>
            </div>
            <div className="text-3xl">📁</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Contatos</p>
              <p className="text-2xl font-bold text-gray-800">3</p>
            </div>
            <div className="text-3xl">📞</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Bem-vindo ao Painel Admin</h2>
        <p className="text-gray-600">
          Use o menu lateral para navegar entre as diferentes seções do painel administrativo.
          Você pode gerenciar seu perfil, projetos, skills, categorias e contatos.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
