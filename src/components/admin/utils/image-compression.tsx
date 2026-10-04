import React from "react";
import { FormattedNumericText } from "@/components/shared/formatted-numeric-text";

/**
 * Utilitários de compressão de imagens via Canvas WebP e formatação de texto para o painel de administração.
 */

/**
 * Comprime um arquivo de imagem diretamente no navegador utilizando HTML5 Canvas e formato WebP.
 * @param file Arquivo File de imagem
 * @param maxDimension Dimensão máxima de largura ou altura (padrão 1200px)
 * @param quality Qualidade de compressão de 0 a 1 (padrão 0.82)
 * @returns Promise com o Data URL WebP comprimido e o nome do arquivo
 */
export function compressFileToDataUrl(
  file: File,
  maxDimension: number = 1200,
  quality: number = 0.82
): Promise<{ dataUrl: string; name: string }> {
  return new Promise<{ dataUrl: string; name: string }>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const img = new Image();

      img.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          let w = img.width;
          let h = img.height;

          if (w > maxDimension || h > maxDimension) {
            if (w > h) {
              h = Math.round((h * maxDimension) / w);
              w = maxDimension;
            } else {
              w = Math.round((w * maxDimension) / h);
              h = maxDimension;
            }
          }

          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, w, h);
          const compressed = canvas.toDataURL("image/webp", quality);
          resolve({ dataUrl: compressed, name: file.name });
        } catch (error) {
          reject(error);
        }
      };

      img.onerror = () => reject(new Error("Não foi possível processar a imagem."));
      img.src = reader.result as string;
    };

    reader.onerror = () => reject(new Error("Não foi possível ler o arquivo de imagem."));
    reader.readAsDataURL(file);
  });
}

/**
 * Formata rótulos de edição como '1ª Edição', separando o número do sufixo ordinal para estilização CSS.
 * @param editionNumber String como '1ª Edição', '2º', '3'
 * @param className Classes adicionais no container
 */
export function renderEditionLabel(
  editionNumber: string,
  className: string = ""
): React.ReactElement {
  const normalized = editionNumber?.trim() || "";
  const match = normalized.match(/^(\d+)\s*([ºª°])?(?:\s*(.*))?$/i);

  if (!match) {
    return (
      <span className={className}>
        <FormattedNumericText value={normalized || "Edição"} />
      </span>
    );
  }

  const [, number, suffix = "ª", rest = ""] = match;

  return (
    <span className={className}>
      <FormattedNumericText value={`${number}${suffix}${rest ? ` ${rest}` : ""}`} />
    </span>
  );
}
