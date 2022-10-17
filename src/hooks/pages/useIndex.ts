import { useEffect, useState } from "react";
import { Professor } from "../../@types/professor";
import { ApiService } from "../../services/apiService";

export function useIndex() {
    const [listaProfessores, setListaProfessores] = useState<Professor[]>([]);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [professorSelecionado, setProfessorSelecionado] = useState<Professor | null>(null);
    const [mensagem, setMensagem] = useState('');

        useEffect(() => {
            ApiService.get('/professores').then((resposta) => {
                setListaProfessores(resposta.data)
            })
        }, []);

        useEffect(() => {
            limparformulario();
        }, [professorSelecionado])

        function marcarAula() {
            if (professorSelecionado !== null) {
                if (validarDado()) {
                    ApiService.post('/professores/' + professorSelecionado.id + '/aulas', {
                        nome,
                        email
                    }).then(() => {
                        setProfessorSelecionado(null);
                        setMensagem('Cadastrado com sucesso');
                    }).catch((error) => {
                        setMensagem(error.response?.data.message);
                    });
                } else {
                    setMensagem('Preencha corretamente os dados')
                }
            }
        }

        function validarDado() {
            return nome.length > 0 && email.length > 0;
        }

        function limparformulario() {
            setNome('');
            setEmail('');
        }

        return {
            listaProfessores,
            nome,
            setNome,
            email,
            setEmail,
            professorSelecionado,
            setProfessorSelecionado,
            marcarAula,
            mensagem,
            setMensagem
        }
}