// import React, { useState } from 'react';

// const IdeiaForm = () => {
//   const [formData, setFormData] = useState({
//     title: '',
//     campaign: 0,
//     description: '',
//     benefits: '',
//     whereToDo: '',
//     performer_id: 0,
//     investment: '',
//     // group_id: 0,
//     // status: '',
//     // attachments: null, // Altere para o tipo de input apropriado para anexos
//     // problem: '',
//     // howWas: '',
//     // calculationBefore: '',
//     // suggestion: '',
//     // howWasAfter: '',
//     // calculationAfter: '',
//     // gains: '',
//     // hasEnvironmentalGains: false,
//     // environmentalGains: '',
//     // hasSecurityGains: false,
//     // securityGains: '',
//     // groupInvolvement: '',
//     // glossary: '',
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked, files } = e.target;

//     if (type === 'file') {
//       setFormData({ ...formData, [name]: files[0] });
//     } else if (type === 'checkbox') {
//       setFormData({ ...formData, [name]: checked });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Lógica para enviar os dados do formulário à API (substitua)
//     console.log('Dados enviados:', formData);
//   };

//   return (
//     <div>
//       <h2>Adicionar Ideia</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Título:</label>
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             className="form-control"
//           />
//         </div>
//         <div className="form-group">
//           <label>Campanha:</label>
//           <input
//             type="number"
//             name="campaign"
//             value={formData.campaign}
//             onChange={handleChange}
//             className="form-control"
//           />
//         </div>
//         <div className="form-group">
//           <label>DESCRIÇÃO DA SUGESTÃO (Qual é a sua ideia? O que precisa ser feito para realizá-la? Que problema ou oportunidade existe atualmente que ela pode resolver?)</label>
//           <input
//             type="text"
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             className="form-control"
//           />
//         </div>
//         <div className="form-group">
//           <label>BENEFÍCIOS/GANHOS PREVISTOS (Listar todos os ganhos que a ideia poderá ter após sua implantação.)</label>
//           <input
//             type="text"
//             name="benefits"
//             value={formData.benefits}
//             onChange={handleChange}
//             className="form-control"
//           />
//         </div>
//         <div className="form-group">
//           <label>Onde Fazer</label>
//           <input
//             type="text"
//             name="whereToDo"
//             value={formData.whereToDo}
//             onChange={handleChange}
//             className="form-control"
//           />
//         </div>
//         <div className="form-group">
//           <label>Quem vai fazer</label>
//           <input
//             type="text"
//             name="performer_id"
//             value={formData.performer_id}
//             onChange={handleChange}
//             className="form-control"
//           />
//         </div>
//         <div className="form-group">
//           <label>Investimentos para a execução</label>
//           <input
//             type="text"
//             name="investment"
//             value={formData.investment}
//             onChange={handleChange}
//             className="form-control"
//           />
//         </div>
//         <div className="form-group">
//           <label>Anexos:</label>
//           <input
//             type="file"
//             name="attachments"
//             onChange={handleChange}
//             className="form-control-file"
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">
//           Adicionar Ideia
//         </button>
//       </form>
//     </div>
//   );
// };

// export default IdeiaForm;
