import { Component, OnInit } from '@angular/core';
import { RotaService } from '../../services/rota.service';
import { Rota } from '../../models/rota.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RotaViagemResponse } from '../../models/rotaViagemResponse.model';
import { error } from 'console';

@Component({
  selector: 'app-rotas',
  standalone: true,
  templateUrl: './rotas.component.html',
  styleUrls: ['./rotas.component.css'],
  imports: [FormsModule, CommonModule],
  providers: [RotaService]
})
export class RotasComponent implements OnInit {
  constructor(private rotaService: RotaService) {}

  rotas: Rota[] = [];
  rotaAtual: Rota = new Rota(0, '', '', 0);
  origemConsulta: string = '';
  destinoConsulta: string = '';
  melhoresRotas?: RotaViagemResponse;

  ngOnInit(): void {
    this.carregarRotas();
  }

  carregarRotas() {
    this.rotaService.getRotas().subscribe((data) => {
      this.rotas = data;
    });
  }

  salvarRota() {
    if (this.rotaAtual.id) {
      this.rotaService.alterarRota(this.rotaAtual.id, this.rotaAtual).subscribe(() => {
        this.carregarRotas();
        this.limparFormulario();
      });
    } else {
      console.log(this.rotaAtual.id)
      this.rotaService.incluirRota(this.rotaAtual).subscribe(() => {
        this.carregarRotas();
        this.limparFormulario();
      });
    }
  }

  editarRota(rota: Rota) {
    this.rotaAtual = { ...rota };
  }

  excluirRota(id: number) {
    this.rotaService.excluirRota(id).subscribe(() => {
      this.carregarRotas();
    });
  }

  consultarMelhorRota() {
    this.rotaService.consultarMelhorRota(this.origemConsulta, this.destinoConsulta)
    .subscribe((data: RotaViagemResponse) => {
      this.melhoresRotas = data;
    });

  }

  limparFormulario() {
    this.rotaAtual = new Rota(0, '', '', 0);
  }
}
